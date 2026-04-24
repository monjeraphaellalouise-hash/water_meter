import { Capacitor } from '@capacitor/core';
import { createWorker, PSM } from 'tesseract.js';
import { CapacitorPluginMlKitTextRecognition } from '@pantrist/capacitor-plugin-ml-kit-text-recognition';

type DetectionResult = {
  detected: string | null;
  confidence: number;
};

type Strategy = 'light' | 'moderate' | 'aggressive' | 'inverted' | 'sharp' | 'adaptive' | 'extreme';

function stripDataUrlPrefix(imageData: string): string {
  const commaIndex = imageData.indexOf(',');
  return commaIndex >= 0 ? imageData.slice(commaIndex + 1) : imageData;
}

function upscaleImage(canvas: HTMLCanvasElement, scale: number): HTMLCanvasElement {
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = canvas.width * scale;
  scaledCanvas.height = canvas.height * scale;

  const ctx = scaledCanvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

  return scaledCanvas;
}

function preprocessImage(canvas: HTMLCanvasElement, strategy: Strategy): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  if (strategy === 'light') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = 1.4;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let value = factor * (avg - 128) + 128;
      value = Math.max(0, Math.min(255, value));
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  } else if (strategy === 'moderate') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = 1.7;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let value = factor * (avg - 128) + 128;
      if (value > 140) value = 255;
      else if (value < 100) value = 0;
      else value = Math.max(0, Math.min(255, value));
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  } else if (strategy === 'aggressive') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = 2.2;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let value = factor * (avg - 128) + 128;
      value = value > 127 ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  } else if (strategy === 'inverted') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      let value = 255 - avg;
      const contrast = 1.8;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      value = factor * (value - 128) + 128;
      value = value > 127 ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  } else if (strategy === 'sharp') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = 2.5;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let value = factor * (avg - 128) + 128;
      value = value > 150 ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  } else if (strategy === 'adaptive') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = 2.0;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let value = factor * (avg - 128) + 128;
      value = value > 120 ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  } else if (strategy === 'extreme') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = 3.0;
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let value = factor * (avg - 128) + 128;
      value = value > 110 ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function normalizeNumericString(text: string): string | null {
  const cleanedText = text.trim().replace(/[^\d.]/g, '');
  if (!cleanedText) return null;

  const parts = cleanedText.split('.');
  const normalized = parts.length > 1
    ? `${parts[0]}.${parts.slice(1).join('')}`
    : cleanedText;

  const parsedNumber = parseFloat(normalized);
  if (Number.isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber >= 999999) {
    return null;
  }

  return parsedNumber.toFixed(2);
}

function collectNumericCandidates(text: string): string[] {
  const tokens = text.match(/\d+(?:\.\d+)?/g) ?? [];
  const normalized = tokens
    .map(normalizeNumericString)
    .filter((value): value is string => Boolean(value));

  return Array.from(new Set(normalized));
}

function pickBestCandidate(candidates: string[]): string | null {
  if (candidates.length === 0) return null;

  const sorted = [...candidates].sort((left, right) => {
    const leftDigits = left.replace('.', '').length;
    const rightDigits = right.replace('.', '').length;
    if (rightDigits !== leftDigits) return rightDigits - leftDigits;
    return parseFloat(right) - parseFloat(left);
  });

  return sorted[0] ?? null;
}

async function detectWithMlKit(imageData: string): Promise<DetectionResult> {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
    return { detected: null, confidence: 0 };
  }

  try {
    const base64Image = stripDataUrlPrefix(imageData);
    const result = await CapacitorPluginMlKitTextRecognition.detectText({
      base64Image,
      rotation: 0,
    });

    const texts: string[] = [result.text];

    for (const block of result.blocks ?? []) {
      texts.push(block.text);
      for (const line of block.lines ?? []) {
        texts.push(line.text);
        for (const element of line.elements ?? []) {
          texts.push(element.text);
        }
      }
    }

    const candidates = texts.flatMap(collectNumericCandidates);
    const detected = pickBestCandidate(candidates);

    if (!detected) {
      return { detected: null, confidence: 0 };
    }

    return {
      detected,
      confidence: 92,
    };
  } catch (error) {
    console.warn('ML Kit OCR failed, falling back to Tesseract:', error);
    return { detected: null, confidence: 0 };
  }
}

async function detectWithTesseract(imageData: string): Promise<DetectionResult> {
  let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });

    worker = await createWorker('eng', 1, {
      logger: (message) => {
        if (message.status === 'recognizing text') {
          console.log(`OCR Progress: ${Math.round(message.progress * 100)}%`);
        }
      },
    });

    const strategies: Strategy[] = [
      'light',
      'moderate',
      'aggressive',
      'inverted',
      'sharp',
      'adaptive',
      'extreme',
    ];

    const psmModes: PSM[] = [
      PSM.AUTO,
      PSM.SINGLE_BLOCK,
      PSM.SINGLE_LINE,
      PSM.SINGLE_WORD,
      PSM.RAW_LINE,
    ];

    const scales = [1, 2, 3];

    const allResults: Array<{
      number: string;
      confidence: number;
    }> = [];

    for (const scale of scales) {
      for (const strategy of strategies) {
        for (const psm of psmModes) {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) continue;

            ctx.drawImage(img, 0, 0);

            let processCanvas = canvas;
            if (scale > 1) {
              processCanvas = upscaleImage(canvas, scale);
            }

            preprocessImage(processCanvas, strategy);
            const processedData = processCanvas.toDataURL('image/png', 1.0);

            await worker.setParameters({
              tessedit_pageseg_mode: psm as unknown as string,
              tessedit_char_whitelist: '0123456789.',
            } as never);

            const { data } = await worker.recognize(processedData);
            const candidates = collectNumericCandidates(data.text);
            const detected = pickBestCandidate(candidates);

            if (detected) {
              allResults.push({
                number: detected,
                confidence: data.confidence,
              });
            }
          } catch (error) {
            console.log('Tesseract strategy failed:', error);
          }
        }
      }
    }

    if (allResults.length === 0) {
      return { detected: null, confidence: 0 };
    }

    allResults.sort((left, right) => right.confidence - left.confidence);
    return {
      detected: allResults[0].number,
      confidence: allResults[0].confidence,
    };
  } catch (error) {
    console.error('Tesseract OCR Error:', error);
    return { detected: null, confidence: 0 };
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
}

export async function detectMeterReading(imageData: string): Promise<DetectionResult> {
  const nativeResult = await detectWithMlKit(imageData);
  if (nativeResult.detected) {
    return nativeResult;
  }

  return detectWithTesseract(imageData);
}
