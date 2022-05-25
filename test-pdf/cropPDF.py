# All the necessary parameters are accessible after line 173s,
# but can of course be changed manually in the Code
# reportlab is also needed, to install run: pip install pillow reportlab


# imports for the crop, rename to avoid conflict with reportlab Image import
from PIL import Image as imgPIL
from PIL import ImageChops, ImageOps, ImageFilter
import os.path

# import for the PDF creation
import glob
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm, mm
from reportlab.lib import utils
from reportlab.platypus import Image, SimpleDocTemplate, Spacer
from reportlab.pdfgen import canvas


# PyPDF2 for the metadata modification
from PyPDF2 import PdfFileReader, PdfFileWriter

# get os path for Cropping
path = (os.path.dirname(os.path.abspath("cropPDF.py")))
dirs = os.listdir(path)


def trim(im, border="white"):
    widthOld, heightOld = im.size
    bg = imgPIL.new(im.mode, im.size, border)
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        cropped = im.crop(bbox)
        widthNew, heightNew = cropped.size
        boolean = False
        if( widthNew!=widthOld or heightNew!=heightOld):
            boolean = True
        return cropped, boolean
    else:
        return im, False
        
def getRGBCorners(im):
    width, height = im.size
    r0, g0, b0 = im.getpixel((0, 0)) #top left
    r1, g1, b1 = im.getpixel((0, height-1)) #bottom left
    r2, g2, b2 = im.getpixel((width-1, 0)) #top right
    r3, g3, b3 = im.getpixel((width-1, height-1)) #bottom right
    return [(r0, g0, b0), (r1, g1, b1), (r2, g2, b2), (r3, g3, b3)]
            
def findMaxWidth():
    maxWidth = 0
    for item in dirs:
        try:
            im = imgPIL.open(item)
            maxWidth = max(maxWidth, im.size[0])
        except:
            pass
    return maxWidth


def padImages(docHeight):
    maxWidth = findMaxWidth()
    for item in dirs:
        try:
            im = imgPIL.open(item)
            name = str(item)[:-4] #removing the file extension from the gathered images
            width, height = im.size  # get the image dimensions, the height is needed for the blank image
            if not docHeight <= height:  # to prevent oversized images from bein padded, such that they remain centered
                image = None
                if addBackground:
                    image = imgPIL.new('RGB', (maxWidth, height), backgroundColor)  # create a white image with the max width			
                else:
                    image = imgPIL.new('RGB', (maxWidth, height), "white") 
                imgPIL.new('RGB', (maxWidth, height), backgroundColor)  # create a white image with the max width			
                image.paste(im, (0, 0))  # paste the original image overtop the blank one, flush on the left side
                image.save(name + ".png", "PNG", quality=100)
        except:
            pass
            
            
def addSeparators( separatorHeight=1 ):
    if separatorHeight <1:
        separatorHeight = 1 #less than one wont be rendered in a PDF reader
    maxWidth = findMaxWidth()
    for item in dirs:
        try:
            im = imgPIL.open(item)
            name = str(item)[:-4]
            width, height = im.size  
            height = height + separatorHeight
            image = imgPIL.new('RGB', (maxWidth, height),(0, 0, 0))  		
            image.paste(im, (0, 0))  
            image.save(name + ".png", "PNG", quality=100)
        except:
            pass
            
def addFrame( frameWidth = 1):
    if frameWidth <1:
        frameWidth = 1 #less than one wont be rendered in a PDF reader
    for item in dirs:
        try:
            im = imgPIL.open(item)
            name = str(item)[:-4]
            width, height = im.size  
            height = height + 2*frameWidth
            width = width +2*frameWidth
            image = imgPIL.new('RGB', (width, height),(0, 0, 0))  		
            image.paste(im, (frameWidth, frameWidth))  
            image.save(name + ".png", "PNG", quality=100)
        except:
            pass


def crop():
    for item in dirs:
        print("cropping "+ str(item))  
        for colour in [backgroundColor, "white", "black",]: #first we want to crop away a white, or black border, or one possibly left over from the last iteration
            try:            
                im = imgPIL.open(item)
                name = str(item)[:-4]
                imCrop, b = trim(im, colour)
                imCrop.save( name + ".png", "PNG", quality=100)
            except:
                pass
               
        b= True
        i=0
        try: #now we try to get the list of RGB values for all four corners, and for each we try and crop this colour away
            im = imgPIL.open(item)
            name = str(item)[:-4]
            while (b== True and i<maxAutoCropIterations): #now we try to crop all four corners, if one succeeds, then we try again, until either we reach a set amount of repetitions or the crop is not successful anymore
                corners = getRGBCorners(im)
                for corner in corners:
                    try: 
                        imCrop,b = trim(im, corner)
                        imCrop.save( name + ".png", "PNG", quality=100)
                    except:
                        pass
                i=i+1
        except:
            pass    
                
        for colour in ["blue", "red", "green", "white", ]: #now we crop away more predefined colours
            try:            
                im = imgPIL.open(item)
                name = str(item)[:-4]
                imCrop = trim(im, colour)
                imCrop.save( name + ".png", "PNG", quality=100)
            except:
                pass


def add_page_number(canvas, doc):
    canvas.saveState()  
    if addBackground and backgroundColor!="white":
        canvas.setFillColor(backgroundColor)
        canvas.rect(-10,-10,doc.width+100,doc.height+100,fill=1)
        if backgroundColor == "black":  
            canvas.setFillColor("white") 
        else: 
            canvas.setFillColor("black")    

    canvas.setFont('Times-Roman', numberFontSize)
    page_number_text = "%d" % (doc.page)
    canvas.drawCentredString(
        pageNumberSpacing * mm,
        pageNumberSpacing * mm,
        page_number_text
    ) 
    canvas.restoreState()

    
#############################

executeCrop = True
includeFrame = False
executePad = True
includeSeparators = False
addBackground = False

backgroundColor = "black"
outputName = "output.pdf"  # The name of the file that will be created

margin = 0.5
imageWidthDefault = 550
spacerHeight = 7
scalingIfImageTooTall = 0.95  # larger than 95 can result in an empty page after the image
frameWidth = 1
separatorHeight = 1
maxAutoCropIterations = 10 #how many successive attempts will be made to auto-crop a single image

includePagenumbers = True
numberFontSize = 10
pageNumberSpacing = 5

author = "Galva101"
title = "CropPDF"
subject = "GitHub"

############################

doc = SimpleDocTemplate(
    outputName,
    topMargin=margin * mm,
    leftMargin=margin * mm,
    rightMargin=margin * mm,
    bottomMargin=margin * mm,
    pagesize=A4
)

print("creating document")
if executeCrop:
    padImages(doc.height)
    crop()
    print("crop finished")
if includeFrame:
    addFrame(frameWidth)
    print("frame added")
if executePad:
    padImages(doc.height)
    print("images padded")
if includeSeparators:
    addSeparators(separatorHeight)
    print("separators included")

story = []  # create the list of images for the PDF

filelist = glob.glob("1.png")  # Get a list of files in the current directory
filelist.sort()

for fn in filelist:
    img = utils.ImageReader(fn)
    img_width, img_height = img.getSize()  # necessary for the aspect ratio
    aspect = img_height / float(img_width)

    documentHeight = doc.height

    imageWidth = imageWidthDefault
    imageHeight = imageWidth * aspect	

    if imageHeight > documentHeight:
        imageHeight = documentHeight * scalingIfImageTooTall
        imageWidth = imageHeight / aspect

    img = Image(
        fn,
        width=imageWidth,
        height=imageHeight
    )
    story.append(img)
    space = Spacer(width=0, height=spacerHeight)
    story.append(space)
    print("appended image "+ str(fn))

if includePagenumbers and not len(filelist) == 0:  # if pagenumbers are desired, or not
    doc.build(
        story,
        onFirstPage=add_page_number,
        onLaterPages=add_page_number
    )
    print("File completed")
elif not len(filelist) == 0:
    doc.build(story)
    print("File completed")
else:  # to prevent an empty PDF that can't be opened
    print("No files found")

#attemp the metadata edit   
try:
    file = open('output.pdf', 'rb+')
    reader = PdfFileReader(file)
    writer = PdfFileWriter()

    writer.appendPagesFromReader(reader)
    metadata = reader.getDocumentInfo()
    writer.addMetadata(metadata)

    writer.addMetadata({
        '/Author': author,
        '/Title': title,
        '/Subject' : subject,
        '/Producer' : "CropPDF",
        '/Creator' : "CropPDF",
    })
    writer.write(file)
    file.close()
    print("Metadata finished")
except:
    print("Error while editing metadata")