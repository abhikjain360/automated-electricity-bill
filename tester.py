import os
from sort_utils import sort_boxes, extract_maxp, is_intersection

curr_path = os.getcwd()
darknet_path = os.path.join(curr_path, "darknet")
predictions_path = os.path.join(darknet_path, "results")
save_path = os.path.join(curr_path, "src")

try:
    os.chdir(darknet_path)
except OSError:
    print("Directory change to darknet failed")
    exit(-1)
os.system('./darknet detector valid obj2.data cfg/yolov3-custom-test.cfg backup/yolov3-custom_last.weights -thresh 0.25 -dont_show -save_labels')

try:
    os.chdir(predictions_path)
except OSError:
    print("Directory change to extract prediction failed")
    exit(-1)

boxes = []
with open('comp4_det_test_0.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 0, float(output[1])])
with open('comp4_det_test_1.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 1, float(output[1])])
with open('comp4_det_test_2.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 2, float(output[1])])
with open('comp4_det_test_3.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 3, float(output[1])])
with open('comp4_det_test_4.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 4, float(output[1])])
with open('comp4_det_test_5.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 5, float(output[1])])
with open('comp4_det_test_6.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 6, float(output[1])])
with open('comp4_det_test_7.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 7, float(output[1])])
with open('comp4_det_test_8.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 8, float(output[1])])
with open('comp4_det_test_9.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 9, float(output[1])])
with open('comp4_det_test_-.txt', 'r') as f:
    outputs = f.readlines()
    for output in outputs:
        output = list(map(str, output.split()))
        if float(output[1]) > 0.4:
            boxes.append([float(output[2]), float(output[3]), float(output[4]), float(output[5]), 10, float(output[1])])
boxes = sort_boxes(boxes)
result = extract_maxp(boxes)
print('Predicted reading: {}'.format(result))

try:
    os.chdir(save_path)
except OSError:
    print("Directory change to save prediction failed")
    exit(-1)

with open('prediction.txt', 'w') as f:
    f.write(result)



