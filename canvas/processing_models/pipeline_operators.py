from .basic_operators import *
from .io_operators import *
from .threshold_operators import *
class Pipeline:
    def __init__(self):
        self.pipeline_functions = {}


    def add_function(self, func, node_id):
        self.pipeline_functions[node_id] = func

    def run(self, connections, nodes_config):
        self.parse_operators(nodes_config)
        results = []
        for nodeid in nodes_config:
            if nodes_config[nodeid]['op_type'] == 'input':
                self.propagate(nodeid, None, connections, nodes_config, results)
        return results

    def propagate(self, node_id, img, connections, nodes_config, results):
        print(f"node ID: {node_id}  ->")
        img_r = self.pipeline_functions[node_id].execute(img, results)
        if nodes_config[node_id]['op_type'] == 'output':
            print('end')
            return

        for connection in connections:
            node_in_id, node_out_id = connection['in'], connection['out']
            if node_out_id == node_id:
                self.propagate(node_in_id, img_r, connections, nodes_config, results)

    def parse_operators(self, nodes_config):
        for node_id, config in nodes_config.items():
            print(node_id, config)
            if config['op_type'] == 'input':
                self.add_function(InputOperator(config), node_id)
            elif config['op_type'] == 'output':
                self.add_function(OutputOperator(config), node_id)
            elif config['op_type'] == 'shift':
                self.add_function(TranslateOperator(config), node_id)
            elif config['op_type'] == 'resize':
                self.add_function(ResizeOperator(config), node_id)
            elif config['op_type'] == 'gray':
                self.add_function(GrayOperator(config), node_id)
            elif config['op_type'] == 'global_threshold':
                self.add_function(GlobalThresholdOperator(config), node_id)
            elif config['op_type'] == 'adaptive_mean_threshold':
                self.add_function(AdaptiveMeanThresholdOperator(config), node_id)
            elif config['op_type'] == 'adaptive_gauss_threshold':
                self.add_function(AdaptiveGaussThresholdOperator(config), node_id)