from operator import gt
from pdfreader import SimplePDFViewer, PageDoesNotExist

fd = open('document-page0.pdf', "rb")
viewer = SimplePDFViewer(fd)

plain_text = ""
pdf_markdown = ""
images = []
try:
    while True:
        viewer.render()
        pdf_markdown += viewer.canvas.text_content
        plain_text += "".join(viewer.canvas.strings)
        images.extend(viewer.canvas.inline_images)
        images.extend(viewer.canvas.images.values())
        viewer.next()
except PageDoesNotExist:
    pass


def isOperand(x):
    return ((x >= 'a' and x <= 'z') or
            (x >= 'A' and x <= 'Z'))
 
# Get Infix for a given postfix
# expression
def getInfix(exp) :
 
    s = []
 
    for i in exp:    
         
        # Push operands
        if (isOperand(i)) :        
            s.insert(0, i)
             
        # We assume that input is a
        # valid postfix and expect
        # an operator.
        else:
         
            op1 = s[0]
            s.pop(0)
            op2 = s[0]
            s.pop(0)
            s.insert(0, "(" + op2 + i +
                             op1 + ")")
             
    # There must be a single element in
    # stack now which is the required
    # infix.
    return s[0]
 
# Driver Code
if __name__ == '__main__':

    print(plain_text)

# print(images)
