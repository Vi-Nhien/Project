
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome(executable_path="chromedriver.exe")

# options = webdriver.ChromeOptions()
# options.add_experimental_option('excludeSwitches', ['enable-logging'])
# driver = webdriver.Chrome(options=options)
driver.maximize_window()
driver.get('https://dev.ascvn.vn/login')

elements = driver.find_element_by_class_name('btn-login').click()
userName = driver.find_element_by_name("Username").send_keys("master") 
password = driver.find_element_by_name("Password").send_keys("2222@") 
elements = driver.find_element_by_class_name('f-submit').click()

# search = driver.find_element_by_class_name("search-input").send_keys("Danh m")
# wait = WebDriverWait(driver, 10)
# inputBox = wait.until(EC.element_to_be_clickable((By.XPATH, "//input[@class='search-inputs']")))
# actionChains = ActionChains(driver)
# actionChains.move_to_element(inputBox).send_keys("Danh m").perform()


like = driver.find_elements_by_xpath("//div[@class = 'dashboard-module']/div[@class = 'module__list--item']")
# for x in range(0,len(like)):
#     if like[x].is_displayed():
like[1].click()

tesst = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@class = 'module__list--item']")))
tesst[1].click()
