function handleRegistration(o){console.log("SW Başarıyla Kayıt Edildi. ",o),o.onupdatefound=e=>{const a=o.installing;a.onstatechange=e=>{"installed"===a.state&&(navigator.serviceWorker.controller?console.log("SW Güncellendi"):(console.log("Yepisyeni SW"),createSnackbar({message:"Çevrimdışı kullanıma hazır.",duration:3e3})))}}}navigator.serviceWorker&&(navigator.serviceWorker.register("/sw.js").then(e=>handleRegistration(e)).catch(e=>{console.log("ServiceWorker kaydı başarısız oldu: ",e)}),navigator.serviceWorker.onmessage=e=>{console.log("SW: Yayında:",event);e=e.data;"UPDATE_FOUND"==e.command&&(console.log("UPDATE_FOUND_BY_SW",e),createSnackbar({message:"İçerik güncellendi.",actionText:"refresh",action:function(e){location.reload()}}))});
//# sourceMappingURL=sw-registration.js.map
