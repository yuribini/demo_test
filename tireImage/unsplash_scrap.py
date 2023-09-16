from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import os
import requests
from PIL import Image
from io import BytesIO


URL = "https://unsplash.com/ko/s/%EC%82%AC%EC%A7%84/tire"

# 웹 드라이버 초기화
driver = webdriver.Chrome(executable_path="/Users/kwontaewoong/Downloads/chromedriver-mac-arm64/chromedriver")

# Unsplash 웹사이트에 접속
driver.get(URL)

# 스크롤 다운을 위한 ActionChains 객체 생성
actions = ActionChains(driver)

# 페이지의 끝까지 여러 번 스크롤 다운
for _ in range(10):  # 10번 스크롤, 필요에 따라 조절 가능
    actions.send_keys(Keys.PAGE_DOWN).perform()
    time.sleep(1)  # 각 스크롤 사이에 대기, 이미지 로드를 위해

# 페이지의 내용을 BeautifulSoup 객체로 변환
soup = BeautifulSoup(driver.page_source, "html.parser")

# 이미지 URL들을 가져옴
image_urls = [img['src'] for img in soup.select("img.JObFE")]

print(image_urls)

# 이미지 URL을 다운로드하고 지정된 경로에 저장하는 함수
def download_image(url, save_path):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))
        image_name = url.split("?")[0].split("/")[-1]  # URL에서 이미지 이름 추출
        image_path = os.path.join(save_path, image_name + ".jpg")
        image.save(image_path, format="JPEG")
        print(f"Saved image to {image_path}")
    except Exception as e:
        print(f"Error downloading and saving image from {url}. Error: {e}")

# 이미지 저장 경로
SAVE_PATH = "/Users/kwontaewoong/tireApp/tireImage/20230910_Google"

# 디렉토리가 없으면 생성
if not os.path.exists(SAVE_PATH):
    os.makedirs(SAVE_PATH)

# 모든 이미지 URL에서 이미지 다운로드
for img_url in image_urls:
    download_image(img_url, SAVE_PATH)

# 웹 드라이버 종료
driver.quit()


