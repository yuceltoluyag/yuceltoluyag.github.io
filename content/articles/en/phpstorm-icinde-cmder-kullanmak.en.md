Title: Using Cmder in PHPStorm
Date: 2019-11-06 12:00 10:00
Modified: 2025-08-11 22:59
Category: Geliştirme Araçları
Tags: phpstorm
Slug: phpstorm-icinde-cmder-kullanmak
Authors: yuceltoluyag
Series: phpstorm
Series_index: 1
Summary: Steps to set environment variables and make necessary configurations to use Cmder as terminal in PHPStorm.
Status: published
Template: article
Image: images/phpstorm_terminal-xl.webp
Lang: en

## Using Cmder in PHPStorm 🚀

To use the terminal in PHPStorm, we need to specify the path in **environment variables**. You can follow these steps to add environment variables in Windows environment:

### Setting Environment Variables ⚙️

1. Right-click on My Computer and go to **Properties**.
2. Click on **Advanced System Settings**.
3. Just below the **Startup and Recovery** section, you will see **Environment Variables**.
4. Click on **Environment Variables** and press the **New** button.

📌 **Variable Name:** `CMDER_ROOT`  
📌 **Path:** `C:\cmder`

[responsive_img src="/images/ortam_degiskenleri1-xl.webp" alt="Environment Variables" /]

I had downloaded the full version of Cmder and extracted it to the `C:` directory. Show the directory where you installed it.

[responsive_img src="/images/ortam_degiskenleri3-xl.webp" alt="Environment Variable Setting" /]

### Terminal Setting for PHPStorm 🛠️

1. Enter the **Settings** tab in PHPStorm.
2. Click on the **Terminal** tab under the **Tools** menu.
3. Write the following command in the **Shell Path** section:

```bash
"cmd" /k ""%CMDER_ROOT%\vendor\init.bat""
```

[responsive_img src="/images/phpstorm_terminal-xl.webp" alt="PHPStorm Cmder Setting" /]

### Restarting PHPStorm 🔄

After applying the settings, restart PHPStorm. When it opens again, you can see that Cmder is working by clicking on the **Terminal** tab. 🎉

[responsive_img src="/images/phpstorm_terminal2-xl.webp" alt="PHPStorm Cmder Terminal" /]

Cmder terminal is a very practical tool for Windows users. You can download the full version from [here](https://cmder.app/){: target="\_blank" rel="noopener noreferrer"} and extract it to any directory you want. 😊

See you in the next guide! 🚀
