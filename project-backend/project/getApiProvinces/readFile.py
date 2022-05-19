import pandas as pd
import io 
import csv

# col_names = ['Mã', 'Tên','Cấp']

# df = pd.read_csv(f"TinhThanh.csv" , usecols= ['Mã','Tên', 'Tên Tiếng Anh', 'Cấp'])

# print(df.head())
# nameProvinces = pd.DataFrame(df, columns=['Tên', 'Cấp'] )
# print(nameProvinces)


import csv
  
# Open file 
with open('TinhThanh.csv', encoding='utf-8') as file_obj:
    heading = next(file_obj)
    reader_obj = csv.reader(file_obj)
    for row in reader_obj:
        print(row)