# # import PyPDF2
# # from PyPDF2 import PdfFileWriter, PdfFileReader

# # inputpdf = PdfFileReader(open('De-Toan-101.pdf', 'rb'))

# # for i in range(inputpdf.numPages):
# #     output = PdfFileWriter()
# #     output.addPage(inputpdf.getPage(i))
# #     with open("document-page%s.pdf" % i, "wb") as outputStream:
# #         output.write(outputStream)

# import os
# import sys
# import re
# from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
# from pdfminer.converter import TextConverter
# from pdfminer.layout import LAParams
# from pdfminer.pdfpage import PDFPage
# from io import BytesIO
# import binascii

# def clear_text():
#    open("output.txt", "w").close()
   
# #writelines function
# def writelines(self, lines):
#     self._checkClosed()
#     for line in lines:
#        self.write(line)

# #PDF to text Function. 
# def pdf_to_text(path):
#     manager = PDFResourceManager()
#     retstr = BytesIO()
#     layout = LAParams(all_texts=True)
#     device = TextConverter(manager, retstr, laparams=layout)
#     filepath = open(path, 'rb')
#     interpreter = PDFPageInterpreter(manager, device)

#     for page in PDFPage.get_pages(filepath, check_extractable=True):
#         interpreter.process_page(page)

#     text = retstr.getvalue()
#     filepath.close()
#     device.close()
#     retstr.close()
#     return text


# if __name__ == "__main__":

#  clear_text()
#  fname = os.listdir('C:/Users/ASCVN/Documents/Folder/test-pdf/splits') #fname : List contain pdf documents names.
#  #fname: must be sorted.
#  fname.sort(key=lambda f: int(re.sub('\D', '', f)))
#  length = len(fname) 


#  for i in range(length): #Repeat each operation for each document.

#      text_output = pdf_to_text(('C:/Users/ASCVN/Documents/Folder/test-pdf/splits/{}').format(fname[i])) #Extract text with PDF_to_text Function call
#     #  print(text_output)
#      text1_output = text_output.decode("utf-8")     #Decode result from bytes to text
#     #  print(text1_output)
#     #  text2_output = binascii.hexlify(text_output.encode('cp1258', errors='backslashreplace'))
#     #  print( binascii.unhexlify(text_output).decode('unicode-escape')) 

    
   
#      with open("output.txt", "a", encoding="utf-8") as text_file:
#        text_file.writelines(text1_output)



import typing
# New imports
from borb.pdf.canvas.layout.image.image import Image
from borb.pdf.canvas.layout.page_layout.multi_column_layout import SingleColumnLayout
from borb.pdf.canvas.layout.page_layout.page_layout import PageLayout
from borb.pdf.canvas.layout.text.paragraph import Paragraph
from borb.pdf.document import Document
from borb.pdf.page.page import Page
from borb.pdf.pdf import PDF

# Main method to create the document
def create_document():

    # Create Document
    d: Document = Document()

    # Create/add Page
    p: Page = Page()
    d.append_page(p)

    # Set PageLayout
    l: PageLayout = SingleColumnLayout(p)

    # Add Paragraph
    l.add(Paragraph("Lorem Ipsum"))

    # Write
    with open("output_001.pdf", "wb") as pdf_file_handle:
        PDF.dumps(pdf_file_handle, d)