Title: How to Use Verot.net Upload Class
Date: 2017-02-15
Category: PHP
Author: yuceltoluyag
Slug: verotnet-upload-sinifi-nasil-kullanilir
Summary: With the class.upload.php file developed by Verot.net, you can easily perform file and image uploads in PHP projects.
Tags: php, upload, verot, file upload, image upload
Lang: en
Translation: false
Image: images/verotnetsinifikullanimi-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115601184646837095
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6dbrhcxxs2s

## How to Use Verot.net Upload Class

I want to share with you a wonderful upload class I came across while looking for multi-upload classes to use in my project.  
This class, which is quite **simple** to install and use, provides great convenience, especially in image upload operations.

## Installation

First, we download the ZIP file from the [Verot.net class.upload.php](https://www.verot.net/php_class_upload.htm){: target="\_blank" rel="noopener noreferrer"} address.  
Enter the **SRC** folder inside the ZIP and:

- copy the `class.upload.php` file
- copy the `lang` folder

to the directory where your project is located.

Then we include the class in our PHP file:

```php
require_once 'class.upload.php';
```

## Creating the Form Area

We prepare our HTML form as follows:

```html
<form enctype="multipart/form-data" method="post" action="upload.php">
  <input type="file" size="32" name="image_field" value="" />
  <input type="submit" name="Submit" value="upload" />
</form>
```

The `name` part is important here.
Since we will be uploading an image, we can name it `image_field` or `image`.
The form will be sent to the `upload.php` page using the POST method.

## File Upload Process on the PHP Side

Write the following codes in the `upload.php` file:

```php
$handle = new upload($_FILES['image_field']); // We wrote the name from the input field here
if ($handle->uploaded) {
  $handle->file_new_name_body   = 'image_resized';
  $handle->image_resize         = true; // We confirm that we want to resize the image
  $handle->image_x              = 100;  // It will shrink to 100 on the X axis
  $handle->image_ratio_y        = true; // Aspect ratio protection
  $handle->process('/home/user/files/'); // The folder where the file will be uploaded
  if ($handle->processed) {  // If successful
    echo 'image resized';
    $handle->clean();
  } else { // If failed
    echo 'error : ' . $handle->error;
  }
}
```

!!! tip "Tip ⚡ This example automatically creates a small-sized copy (thumbnail) of the image."

## Removing Thumb (Small Image) Creation

If you don't want a thumb, simply remove the following lines:

```php
$handle->file_new_name_body   = 'image_resized';
$handle->image_resize         = true;
$handle->image_x              = 100;
$handle->image_ratio_y        = true;
```

## Including Language File

If you want error messages and system outputs in a specific language, you can include the language file as follows:

```php
$handle = new upload($_FILES['image_field'], 'tr_TR');
```

If you don't write this, the default language will be English.

!!! note "Note: Language files are located in the `lang` folder, and you can extend support by adding files for different languages."

## Useful Settings and Methods

Below are some frequently used features and their descriptions:

```php
$handle->file_overwrite = true;
```

Allows files to be overwritten.
For example, if there is a file with the same name (`john.jpg`), it overwrites it instead of giving an error.

```php
$handle->file_new_name_body = 'new_name';
```

Determines the name of the uploaded file. For example, if you write “abuzer,” all images will be uploaded with this name.

```php
$handle->file_auto_rename = true;
```

If a file with the same name exists, it automatically gives it a different name. (Default: false)

```php
$handle->file_max_size = '1024';
```

Limits the size of the file to be uploaded (example: 1 KB).

```php
$handle->allowed = array('application/pdf','application/msword','image/*');
```

Specifies the file types allowed to be uploaded.

```php
$handle->image_convert = 'jpg';
```

Converts uploaded images to the desired format. (Supported formats: png, jpeg, gif, bmp)

```php
$handle->jpeg_quality = 50;
```

Determines the image quality. As the value decreases, the file size decreases, and the quality drops.

```php
$handle->image_max_width = 200;
$handle->image_max_height = 100;
$handle->image_min_width = 100;
$handle->image_min_height = 500;
```

Controls the minimum and maximum sizes of images.

!!! warning "Caution! Files that exceed size limits or unsupported file types will give an error."

For more information, you can examine the official documentation:
👉 [https://github.com/verot/class.upload.php/blob/master/README.md](https://github.com/verot/class.upload.php/blob/master/README.md){: target="\_blank" rel="noopener noreferrer"}

[responsive_img src="/images/verotnetsinifikullanimi-xl.webp" alt="How to Use Verotnet." /]
