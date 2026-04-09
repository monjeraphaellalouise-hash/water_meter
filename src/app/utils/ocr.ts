import { createWorker, PSM } from 'tesseract.js';

/**
 * Upscale image for better OCR accuracy
 */
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

/**
 * Advanced preprocessing strategies for different meter types
 */
function preprocessImage(
  canvas: HTMLCanvasElement,
  strategy: 'light' | 'moderate' | 'aggressive' | 'inverted' | 'sharp' | 'adaptive' | 'extreme'
): HTMLCanvasElement {
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

/**
 * Clean OCR output into a valid meter reading
 */
function cleanMeterText(text: string): string | null {
  const cleanedText = text.trim().replace(/[^\d.]/g, '');
  if (!cleanedText) return null;

  const parts = cleanedText.split('.');
  const normalized = parts.length > 1
    ? `${parts[0]}.${parts.slice(1).join('')}`
    : cleanedText;

  const parsedNumber = parseFloat(normalized);

  if (isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber >= 999999) {
    return null;
  }

  return parsedNumber.toFixed(2);
}

/**
 * Extract meter reading from photo using OCR with multiple strategies
 */
export async function detectMeterReading(
  imageData: string
): Promise<{
  detected: string | null;
  confidence: number;
}> {
  let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

  try {
    console.log('🔍 Starting advanced multi-strategy OCR detection...');

    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });

    worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    const strategies = [
      'light',
      'moderate',
      'aggressive',
      'inverted',
      'sharp',
      'adaptive',
      'extreme',
    ] as const;

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
      strategy: typeof strategies[number];
      psm: PSM;
      scale: number;
    }> = [];

    for (const scale of scales) {
      for (const strategy of strategies) {
        for (const psm of psmModes) {
          try {
            console.log(`🔄 Trying: strategy=${strategy}, psm=${psm}, scale=${scale}x`);

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
            } as any);

            const { data } = await worker.recognize(processedData);

            console.log(`Raw: "${data.text.trim()}" (conf: ${data.confidence.toFixed(1)}%)`);

            const formatted = cleanMeterText(data.text);

            if (formatted) {
              allResults.push({
                number: formatted,
                confidence: data.confidence,
                strategy,
                psm,
                scale,
              });

              console.log(`✅ Valid: ${formatted}`);
            }
          } catch (e) {
            console.log('❌ Failed:', e);
          }
        }
      }
    }

    if (allResults.length > 0) {
      allResults.sort((a, b) => b.confidence - a.confidence);

      const best = allResults[0];

      console.log(`🎯 BEST DETECTION: ${best.number}`);
      console.log(`Confidence: ${best.confidence.toFixed(1)}%`);
      console.log(`Strategy: ${best.strategy}, PSM: ${best.psm}, Scale: ${best.scale}x`);
      console.log('Top 5 results:', allResults.slice(0, 5));

      return {
        detected: best.number,
        confidence: best.confidence,
      };
    }

    console.log('❌ No valid detections from any strategy');
    return {
      detected: null,
      confidence: 0,
    };
  } catch (error) {
    console.error('❌ OCR Error:', error);
    return {
      detected: null,
      confidence: 0,
    };
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
}