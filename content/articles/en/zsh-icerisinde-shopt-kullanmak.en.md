Title: Using Shopt in Zsh
Date: 2020-01-28 12:00 10:00
Modified: 2025-08-11 22:59
Category: Terminal
Tags: linux, terminal, zsh
Slug: zsh-icerisinde-shopt-kullanmak
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 2
Summary: We explain step by step how to use the shopt command within Zsh and how to solve bash incompatibilities.
Status: published
Template: article
Image: images/shopt-xl.webp
Lang: en

Hello! 😊

What is the shopt command? The `shopt` command allows you to change some actions within bash (shell). In a way, it serves a similar function to the alias command. Now let's explain with an example.

When you enter a directory with `cd directory` command, with the `shopt` command you can add to your bashrc file and directly **write the directory name** to enter that directory. Of course, the usage areas of the `shopt` command are not limited to these. For more information, you can visit [Details](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html){: target="\_blank" rel="noopener noreferrer"}.

## Usage Within Zsh

Since Shopt works bash-based, you will naturally get a **'shopt command not found'** error in zsh bash. The solution to this is quite simple.

## Solution

First, enter the following command in your terminal:

```bash
touch shopt
```

Then update the file you created with the following code:

```bash
#!/bin/bash
args='';
for item in $@
do
args="$args $item";
done
shopt $args;
```

Afterwards, move this file to the system with the following command:

```bash
sudo mv shopt /usr/bin/
```

Finally, add the following command to your `.zshrc` file:

```bash
alias shopt='/usr/bin/shopt'
```

That's it! Now you can use the `shopt` command smoothly within Zsh. Enjoy! 😄

## Additional Information

When backing up, it's very important not to forget the scripts you created. Especially during system migrations, I sometimes forget. 🤣

If you don't want to forget your scripts, you can use the [Auto Script Generator](https://github.com/yuceltoluyag/otoscript){: target="\_blank" rel="noopener noreferrer"}.

```bash
alias shopt='ScriptDirectory/shopt'
```

Resource Used: [larz258](https://github.com/larz258/Zshopt){: target="\_blank" rel="noopener noreferrer"}

You can test the following `shopt` settings by adding them to your `.zshrc` or `.bashrc` file:

```bash
#bash opts
shopt -s autocd
shopt -s cdspell
shopt -s cmdhist
shopt -s histappend
shopt -s expand_aliases
shopt -s checkwinsize
shopt -s globstar 2> /dev/null
shopt -s nocaseglob
shopt -s autocd 2> /dev/null
shopt -s dirspell 2> /dev/null
shopt -s cdspell 2> /dev/null
```

[My Zsh Settings!](https://github.com/yuceltoluyag/WindowsTerminal/blob/main/WSL/.zshrc){: target="\_blank" rel="noopener noreferrer"} + [Script Generator!](https://github.com/yuceltoluyag/otoscript){: target="\_blank" rel="noopener noreferrer"}

[responsive_img src="/images/shopt-xl.webp" alt="shopt" /]
