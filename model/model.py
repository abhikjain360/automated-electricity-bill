from scipy.io import loadmat
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import tensorflow.keras.layers as KL
import tensorflow.keras.models as KM
import math
import cv2


def rgb2gray(images):
    return np.expand_dims(np.dot(images, [0.2990, 0.5870, 0.1140]), axis=3)


def normalization(X_train, X_test):
    train_mean = np.mean(X_train, axis=0)
    train_std = np.std(X_train, axis=0)
    X_train = (X_train - train_mean) / train_std
    test_mean = np.mean(X_test, axis=0)
    test_std = np.std(X_test, axis=0)
    X_test = (X_test - test_mean) / test_std
    return X_train, X_test


data_to_train = loadmat("train_32x32.mat")
data_to_test = loadmat("test_32x32.mat")
extra_data = loadmat("extra_32x32.mat")
X_train = np.transpose(data_to_train['X'], (3, 0, 1, 2))
X_test = np.transpose(data_to_test['X'], (3, 0, 1, 2))
X_extra = np.transpose(extra_data['X'], (3, 0, 1, 2))
X_train = np.concatenate((X_train, X_extra[0:80000]), axis=0)
X_train = rgb2gray(X_train)
X_test = rgb2gray(X_test)
y_extra = extra_data['y']
y_train = data_to_train['y']
y_test = data_to_test['y']
y_train = np.concatenate((y_train, y_extra[0:80000]), axis=0)
X_train, X_test = normalization(X_train, X_test)
y_train[y_train == 10] = 0
y_test[y_test == 10] = 0
num_train_examples = X_train.shape[0]
num_test_examples = X_test.shape[0]
inputs = KL.Input(shape=(32, 32, 1))
c = KL.Conv2D(32, (3, 3), padding="valid", activation=tf.nn.relu)(inputs)
m = KL.MaxPool2D((2, 2), (2, 2))(c)
d = KL.Dropout(0.5)(m)
c = KL.Conv2D(64, (3, 3), padding="valid", activation=tf.nn.relu)(d)
m = KL.MaxPool2D((2, 2), (2, 2))(c)
d = KL.Dropout(0.5)(m)
c = KL.Conv2D(128, (3, 3), padding="valid", activation=tf.nn.relu)(d)
f = KL.Flatten()(c)
f = KL.Dense(10, activation=tf.nn.relu)(f)
outputs = KL.Dense(10, activation=tf.nn.softmax)(f)

model = KM.Model(inputs, outputs)
model.summary()
model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

history = model.fit(X_train, y_train, epochs=12, use_multiprocessing=True)
model.save('my_model.h5')
test_loss, test_acc = model.evaluate(X_test, y_test)
print("Test Loss: {0} - Test Acc: {1}".format(test_loss, test_acc))
plt.plot(history.history['accuracy'])
plt.plot(history.history['loss'])
plt.show()
