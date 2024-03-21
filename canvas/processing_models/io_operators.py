import numpy as np
import cv2 as cv
import os

class InputOperator:
    def __init__ (self, config):
        self.config = config
    def execute(self, img, results):
        id = self.config['id']
        source = self.config['source']

        results.append({'id':id,'path':'canvas/images/input/'+str(source)})

        source = cv.imread('canvas/static/canvas/images/input/'+source)
        return source

class OutputOperator:
    def __init__ (self, config):
        self.config = config
    def execute(self, img, results):
        id = self.config['id']


        cv.imwrite('canvas/static/canvas/images/output/'+str(id)+'.jpg',img)
        results.append({'id':id,'path':'canvas/images/output/'+str(id)+'.jpg'})

        return None