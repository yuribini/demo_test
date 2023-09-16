from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import threading
import requests
import os
import hashlib
import time

SEARCH_URL = "https://search.daum.net/search?w=img&nil_search=btn&DA=NTB&enc=utf8&q="
SEARCH_BOX = (By.NAME, "q")
THUMBNAIL_SELECTOR = (By.CSS_SELECTOR, "img[data-original-loaded='true']")
DETAIL_IMAGE_SELECTOR = (By.CSS_SELECTOR, "div.item_img > img")

def generate_image_filename(img_url):
    return hashlib.md5(img_url.encode('utf-8')).hexdigest() + ".jpg"

def download_image(img_url, save_directory):
    try:
        response = requests.get(img_url)
        response.raise_for_status()
        img_filename = generate_image_filename(img_url)
        with open(os.path.join(save_directory, img_filename), "wb") as file:
            file.write(response.content)
    except requests.RequestException:
        print(f"Failed to download {img_url}")

def download_images_from_daum(search_query, max_image_count, save_directory, driver_path):
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)

    s = Service(driver_path)
    driver = webdriver.Chrome(service=s)
    driver.get(SEARCH_URL)

    try:
        search_box = WebDriverWait(driver, 10).until(EC.presence_of_element_located(SEARCH_BOX))
        search_box.send_keys(search_query)
        search_box.send_keys(Keys.RETURN)
    except EC.TimeoutException:
        print("Search box not found!")
        driver.quit()
        return

    img_count = 0
    while img_count < max_image_count:
        # Get all currently loaded thumbnails
        thumbnails = driver.find_elements(*THUMBNAIL_SELECTOR)
        for index, thumbnail in enumerate(thumbnails):
            ActionChains(driver).move_to_element(thumbnail).perform()

            try:
                thumbnail.click()
                detail_images = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located(DETAIL_IMAGE_SELECTOR))
                
                for img_el in detail_images:
                    img_url = img_el.get_attribute("src")
                    if img_url and img_url.startswith(("http://", "https://")):
                        threading.Thread(target=download_image, args=(img_url, save_directory)).start()
                        img_count += 1

                driver.back()
                WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located(THUMBNAIL_SELECTOR))
                # Re-fetch the thumbnails after coming back from the detail view
                thumbnails = driver.find_elements(*THUMBNAIL_SELECTOR)

            except Exception as e:
                print(f"Error processing thumbnail {index}. Reason: {e}")
                # Re-fetch the thumbnails to prevent StaleElementReferenceException
                thumbnails = driver.find_elements(*THUMBNAIL_SELECTOR)

            if img_count >= max_image_count:
                break

        # Scroll to the bottom of the page
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)  # Pause for a short while to let any new images load

    driver.quit()

if __name__ == "__main__":
    SEARCH_QUERY = "정상타이어"
    MAX_IMAGE_COUNT = 1000000
    SAVE_DIRECTORY = "/Users/kwontaewoong/tireApp/tireImage/20230831_Daum"
    DRIVER_PATH = "/Users/kwontaewoong/Downloads/chromedriver-mac-arm64/chromedriver"
    
    download_images_from_daum(SEARCH_QUERY, MAX_IMAGE_COUNT, SAVE_DIRECTORY, DRIVER_PATH)
