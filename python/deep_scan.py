# Import packages
from imutils.perspective import four_point_transform
import matplotlib.pyplot as plt
from imutils import contours
import random
import numpy as np
import argparse
import imutils
import cv2
import os
import json


# Load the image, convert it to grayscale, blur it slightly, find edges, and dilate
filepath = os.path.dirname(os.path.realpath(__file__))
image = cv2.imread(filepath + '/uploads/input.jpg')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
edged = cv2.Canny(blurred, 75, 120)

kernel = cv2.getStructuringElement(cv2.MORPH_CROSS,(3,3))
dilated = cv2.dilate(edged,kernel,iterations = 8) # dilate


# Find contours in the edge map, then initialize the contour that corresponds to the document
cnts = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if imutils.is_cv2() else cnts[1]
docCnt = None

# Ensure that at least one contour was found
if len(cnts) > 0:
    # Sort the contours according to their size in
    # descending order
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

    # Loop over the sorted contours
    for c in cnts:
        # Approximate the contour
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        # If our approximated contour has four points, then we can assume we have found the paper
        if len(approx) == 4:
            docCnt = approx
            break

# Apply a four point perspective transform to both the
# original image and grayscale image to obtain a top-down
# birds eye view of the paper
paper = four_point_transform(image, docCnt.reshape(4, 2))
warped = four_point_transform(gray, docCnt.reshape(4, 2))

# Apply adaptive thresholding with gaussian weighted average to binarize the warped and blurred piece of paper
blurred = cv2.GaussianBlur(warped, (25, 25), 0)
thresh=cv2.adaptiveThreshold(blurred,250,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY_INV,1001,12)

# Find edges in the warped image and dilate
edged = cv2.Canny(warped, 75, 120)
kernel = cv2.getStructuringElement(cv2.MORPH_CROSS,(3,3))
dilated = cv2.dilate(edged,kernel,iterations = 4) # dilate

# Find contours in the thresholded image
cnts = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if imutils.is_cv2() else cnts[1]

# Initialize the list to contain the contours of the ids and questions.
questionCnts = []

# Loop over the contours
for c in cnts:
    # Compute the bounding box of the contour, then use the
    # bounding box to derive the aspect ratio
    (x, y, w, h) = cv2.boundingRect(c)
    ar = w / float(h)

    # In order to label the contour as a question, region
    # should be sufficiently wide, sufficiently tall, and
    # have an aspect ratio approximately equal to 1
    if w >= 100 and h >= 100 and ar >= 0.9 and ar <= 1.1:
        questionCnts.append(c)

# Sort the question contours top-to-bottom,
questionCnts = contours.sort_contours(questionCnts,method="top-to-bottom")[0]

# Identify the id number in each id grouping.
id1=None
id2=None

# Sort each row of contours from left to right
for (index,value) in enumerate(np.arange(0,20,10)):
    cnts=contours.sort_contours(questionCnts[value:value+10])[0]

    fill_count=0

    # Construct a mask that reveals only the current
    # "bubble" for the question
    for (index2, value2) in enumerate(cnts):
        mask=np.zeros(thresh.shape,dtype="uint8")
        cv2.drawContours(mask,[value2],-1,255,-1)

        # Apply the mask to the thresholded image, then
        # count the number of non-zero pixels in the
        # bubble area
        mask=cv2.bitwise_and(thresh,thresh,mask=mask)
        total=cv2.countNonZero(mask)

        # If the current total has a total number of non-zero pixels
        # greater than 9000, then we are examining a bubbled-in answer
        if(((id1 is None) or (total > 9000)) and (index2<=4)):
            if(index==1):
                id1=(total,index2+5)
            else:
                id1=(total,index2)

            if(total>9000):
                fill_count +=1

        if(((id2 is None) or (total > 9000)) and (index2>4)):
            if(index==1):
                id2=(total,index2)
            else:
                id2=(total,index2-5)

            if(total>9000):
                fill_count +=1

if (fill_count>2):
    student_id='ERROR: NO BUBBLE FILLED OR MORE THAN ONE BUBBLE FILLED IN EACH ID GROUP'
elif (min(id1[1],id2[1])==0):
    student_id=max(id1[1],id2[1])
else:
    student_id=int(str(id1[1])+str(id2[1]))

# Generate a dictionary
students={student_id:[]}

# Sort each row of contours from left to right
for (index,value) in enumerate(np.arange(20,len(questionCnts),12)):
    bubbled1=None
    bubbled2=None

    bubbled3=None

    cnts=contours.sort_contours(questionCnts[value:value+12])[0]

    fill_count1=0
    fill_count2=0
    fill_count3=0

    # Construct a mask that reveals only the current
    # "bubble" for the question
    for (index2, value2) in enumerate(cnts):
        mask=np.zeros(thresh.shape,dtype="uint8")
        cv2.drawContours(mask,[value2],-1,255,-1)

        # Apply the mask to the thresholded image, then
        # count the number of non-zero pixels in the
        # bubble area
        mask=cv2.bitwise_and(thresh,thresh,mask=mask)
        total=cv2.countNonZero(mask)

        # If the current total has a total number of non-zero pixels
        # greater than 9000, then we are examining a bubbled-in answer
        if(((bubbled1 is None) or (total > 9000)) and (index2<=3)):
            bubbled1=(total,index2)

            if (total)>9000:
                fill_count1 +=1

        if(((bubbled2 is None) or (total > 9000)) and ((index2>=4) and (index2<=7))):
            bubbled2=(total,index2-4)

            if (total)>9000:
                fill_count2 +=1

        if(((bubbled3 is None) or (total > 9000)) and (index2>=8)):
            bubbled3=(total,index2-8)

            if (total)>9000:
                fill_count3 +=1

    # Populate student answer within dictionary
    if(fill_count1==1):
        students[student_id].append((index+1,bubbled1[1]))
    elif(fill_count1!=1):
        students[student_id].append((index+1,4))

    if(fill_count2==1):
        students[student_id].append((index+16,bubbled2[1]))
    elif(fill_count2!=1):
        students[student_id].append((index+16,4))

    if(fill_count3==1):
        students[student_id].append((index+31,bubbled3[1]))
    elif(fill_count3!=1):
        students[student_id].append((index+31,4))

student_answers_single=list(np.repeat(5,len(students[student_id])))

for answer in students[student_id]:
    student_answers_single[answer[0]-1]=answer[1]

#print answers
print json.dumps(students[student_id])