import numpy as np
import cv2 as cv

class TranslateOperator:
    def __init__ (self, config):
        self.config = config
    def execute(self, img, results):
        shiftx = self.config['x-shift']
        shifty = self.config['y-shift']
        fillValue = eval(self.config['fillValue'])


        M = np.float32([[1,0,shiftx],[0,1,shifty]])
        dst = cv.warpAffine(img,M,(img.shape[1],img.shape[0]),borderValue=fillValue)
        return dst