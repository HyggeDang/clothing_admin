import * as tf from '@tensorflow/tfjs-node';
import * as vgg16 from '@tensorflow-models/vgg16';
import { Image } from 'canvas';
import * as fs from 'fs';

/**
 * Phân tích hình ảnh bằng mô hình VGG16.
 * @param imagePath Đường dẫn đến tệp hình ảnh.
 */
async function analyzeImage(imagePath: string) {
  try {
    // Tải hình ảnh từ file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Chuyển đổi imageBuffer thành đối tượng Image
    const image = new Image();
    image.src = imageBuffer;

    // Chuyển đổi hình ảnh thành tensor mà TensorFlow có thể xử lý
    const tensor = tf.node.decodeImage(imageBuffer);

    // Load mô hình VGG16
    const model = await vgg16.load();

    // Dự đoán kết quả với mô hình VGG16
    const predictions = await model.classify(tensor);

    // In kết quả dự đoán
    console.log('Predictions:');
    predictions.forEach((prediction, index) => {
      console.log(`${index + 1}. ${prediction.className}: ${prediction.probability}`);
    });

    // Giải phóng bộ nhớ
    tensor.dispose();

  } catch (error) {
    console.error('Error analyzing image:', error);
  }
}

// Sử dụng hàm phân tích hình ảnh
const imagePath = 'path_to_your_image.jpg';  // Thay bằng đường dẫn hình ảnh của bạn
analyzeImage(imagePath);
