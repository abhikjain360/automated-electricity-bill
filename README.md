# AUTOMATED ELECTRICTY BILL
## Installantion Instructions(LINUX)
* Clone the darknet repository.

  ```
  $ git clone https://github.com/AlexeyAB/darknet
  $ cd darknet/
  ```
  
* Before make, set options in Makefile as needed:

  - ```GPU=1``` to build with CUDA to accelerate by using GPU (CUDA should be in /usr/local/cuda) <br />
  - ```CUDNN=1``` to build with cuDNN v5-v7 to accelerate training by using GPU (cuDNN should be in /usr/local/cudnn) <br />
  - ```CUDNN_HALF=1``` to build for Tensor Cores (on Titan V / Tesla V100 / DGX-2 and later) speedup Detection 3x, Training 2x <br />
  - ```OPENCV=1``` to build with OpenCV 4.x/3.x/2.4.x - allows to detect on video files and video streams from network cameras or web-cams <br />
  - ```DEBUG=1``` to bould debug version of Yolo <br />
  - For other options head [here.](https://github.com/AlexeyAB/darknet#how-to-compile-on-linux-using-make). <br />
* Then run the following command
  ```
  $ make
  ```
