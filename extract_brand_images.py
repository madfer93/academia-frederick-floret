import fitz # PyMuPDF
import os

pdf_path = r"c:\Users\madfe\Documents\academia-frederick-floret\assets\Manual de Identidad Institucional.pdf"
output_dir = r"c:\Users\madfe\Documents\academia-frederick-floret\public\brand"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

img_count = 0
for page_idx in range(len(doc)):
    page = doc[page_idx]
    image_list = page.get_images(full=True)
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        width = base_image["width"]
        height = base_image["height"]
        
        img_name = f"page_{page_idx+1}_img_{img_idx+1}_{width}x{height}.{image_ext}"
        img_path = os.path.join(output_dir, img_name)
        
        with open(img_path, "wb") as f:
            f.write(image_bytes)
        img_count += 1
        print(f"Extracted: {img_name}")

print(f"Total extracted: {img_count}")
