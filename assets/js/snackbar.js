var createSnackbar=function(){var a=null;return function(t){var e=t.message,n=t.actionText,i=t.action,t=t.duration,s=(a&&a.dismiss(),document.createElement("div")),e=(s.className="paper-snackbar",s.dismiss=function(){this.style.opacity=0},document.createTextNode(e));s.appendChild(e),n&&(i=i||s.dismiss.bind(s),(e=document.createElement("button")).className="action",e.innerHTML=n,e.addEventListener("click",i),s.appendChild(e)),setTimeout(function(){a===this&&a.dismiss()}.bind(s),t||5e3),s.addEventListener("transitionend",function(t,e){"opacity"===t.propertyName&&0==this.style.opacity&&(this.parentElement.removeChild(this),a===this&&(a=null))}.bind(s)),a=s,document.body.appendChild(s),getComputedStyle(s).bottom,s.style.bottom="0px",s.style.left="0px",s.style.opacity=1}}();
//# sourceMappingURL=snackbar.js.map
