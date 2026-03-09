from PIL import Image
from collections import Counter

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def get_dominant_colors(image_path, num_colors=5):
    img = Image.open(image_path)
    img = img.convert('RGB')
    
    # Resize to speed up calculation and group similar colors
    img = img.resize((150, 150))
    
    # Quantize the image to reduce the number of unique colors
    img = img.quantize(colors=16).convert('RGB')
    
    pixels = list(img.getdata())
    
    # Filter out near-white and near-black colors to find actual branding colors
    filtered_pixels = []
    for p in pixels:
        if not (p[0] > 240 and p[1] > 240 and p[2] > 240) and not (p[0] < 20 and p[1] < 20 and p[2] < 20):
            filtered_pixels.append(p)
    
    color_counts = Counter(filtered_pixels)
    most_common = color_counts.most_common(num_colors)
    
    for color, count in most_common:
        print(f"Color: {color} -> {rgb_to_hex(color)} (Count: {count})")

if __name__ == '__main__':
    get_dominant_colors('public/Assets/logo.jpeg')
