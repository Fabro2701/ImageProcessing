import numpy as np
import cv2 as cv

class GlobalThresholdOperator:
    def __init__ (self, config):
        self.config = config
    def execute(self, img, results):
        threshold = int(self.config['threshold'])
        maxv = 255

        _, r = cv.threshold(img,threshold,maxv,cv.THRESH_BINARY)
        return r

class AdaptiveMeanThresholdOperator:
    def __init__ (self, config):
        self.config = config
    def execute(self, img, results):
        block_size = int(self.config['block-size'])
        C = int(self.config['C'])
        maxv = 255
        return cv.adaptiveThreshold(img, maxv, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, block_size, C)

class AdaptiveGaussThresholdOperator:
    def __init__ (self, config):
        self.config = config
    def execute(self, img, results):
        block_size = int(self.config['block-size'])
        C = int(self.config['C'])
        maxv = 255
        return cv.adaptiveThreshold(img, maxv, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, block_size, C)

