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

class CropOperator:
    def __init__(self, config):
        self.config = config

    def execute(self, img, results):
        left = self.config['left']
        top = self.config['top']
        bottom = self.config['bottom']
        right = self.config['right']

        return img[0+top:img.shape[0]-bottom, 0+left:img.shape[1]-right]
class ResizeOperator:
    def __init__(self, config):
        self.config = config

    def execute(self, img, results):
        newx = int(self.config['x-new'])
        newy = int(self.config['y-new'])

        dst = cv.resize(img,(newx, newy))
        return dst

class GrayOperator:
    def __init__(self, config):
        self.config = config

    def execute(self, img, results):
        return cv.cvtColor(img, cv.COLOR_BGR2GRAY)

