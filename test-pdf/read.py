# import PyPDF2 

# with open('1.pdf','rb') as fin:
#     pdf = PyPDF2.PdfFileReader(fin)
#     page = pdf.getPage(0)

#     print(page.cropBox.lowerLeft())
#     print(page.cropBox.upperRight()) 

#     output = PyPDF2.PdfFileWriter()
#     output.addPage(page)

#     with open('cropped-1.pdf','wb') as fo:
#         output.write(fo)

# from PyPDF2 import PdfFileWriter, PdfFileReader

# inputpdf = PdfFileReader(open("1.pdf", "rb"))

# for i in range(inputpdf.numPages):
#     output = PdfFileWriter()
#     output.addPage(inputpdf.getPage(i))
#     with open("document-page%s.pdf" % i, "wb") as outputStream:
#         output.write(outputStream)


# from PyPDF2 import PdfFileWriter, PdfFileReader

# with open("1.pdf", "rb") as in_f:
#     input1 = PdfFileReader(in_f)
#     output = PdfFileWriter()

#     numPages = input1.getNumPages()
#     print ("document has %s pages." % numPages)

#     for i in range(numPages):
#         page = input1.getPage(i)
#         print (page.mediaBox.getUpperRight_x(), page.mediaBox.getUpperRight_y())
#         # page.trimBox.lowerLeft = (25, 25)
#         # page.trimBox.upperRight = (225, 225)
#         page.cropBox.left = (50, 50)
#         page.cropBox.upperRight = (200, 200)
#         output.addPage(page)

#     with open("out.pdf", "wb") as out_f:
#         output.write(out_f)


import os,time
import glob
print('demon started')
file_list_start = glob.glob('1.pdf')

while 1:
    file_list = glob.glob('1.pdf')
    change_flag = False
    for file in file_list:
        if file not in file_list_start:
            if '-crop' in file:
                continue
            command = 'pdfcrop '+file
            res = os.system(command)
            print('crop pdf file:',file,'\t\tresult:',res)
            change_flag = True
    if change_flag:
        file_list_start = file_list
