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

