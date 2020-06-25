'''
    Utility functions for computing final readings from predictions and removing duplicate readings
'''
def is_intersection(l1, l2) -> bool:
    l = [l1, l2]
    l.sort()
    if l2[0] < l1[2]:
        return True
    return False


def sort_boxes(boxes):
    boxes.sort()
    return boxes


def extract_maxp(boxes) -> str:
    result = []
    n = len(boxes)
    i = 0
    while i < n:
        if i < n - 1:
            if is_intersection(boxes[i], boxes[i+1]):
                if boxes[i][5] < boxes[i+1][5]:
                    result.append(str(boxes[i+1][4]))
                else:
                    result.append(str(boxes[i][4]))
                i += 1
            else:
                result.append(str(boxes[i][4]))
        else:
            result.append(str(boxes[i][4]))
        i += 1
    result = ''.join(result)
    return result