import numpy as np
import matplotlib.pyplot as plt
import cv2

# n = number of times image is saved
n = 10

center = (13,13)

for i in range(n):

    # setting the background black
    img = np.zeros((28,28,3))

    # generating the random number
    x = str(np.random.randint(0,10))

    # random line thickness
    line_no = np.random.randint(2,5)

    # putting the text
    img = cv2.putText(img, x, (3,25),cv2.FONT_HERSHEY_DUPLEX, 1, (255,255,255), 2)

    # making the image binary
    ret,img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

    # blurring
    k = np.random.randint(1,3)
    img = cv2.blur(img, (k,k))

    # rotation
    angle = np.random.randint(-15,16)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    img = cv2.warpAffine(img, M, (28, 28), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

    # naming convention = test<image number>_<value on number in image>.jpg
    # you can also directly use the img 
    cv2.imwrite('test'+str(i)+'_'+x+'.jpg',img)