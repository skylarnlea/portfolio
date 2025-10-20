;(function(){
    const modal = document.getElementById('revamp-modal');
    const overlay = modal && modal.querySelector('.revamp-overlay');
    const closeBtn = modal && modal.querySelector('.revamp-close');
    const okBtn = document.getElementById('revamp-ok');
    let lastFocused = null;

    function openModal(){
        if(!modal) return;
        lastFocused = document.activeElement;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden','false');
        // focus the close button for keyboard users
        closeBtn && closeBtn.focus();
        // trap simple focus: keep Tab inside modal
        document.addEventListener('focus', enforceFocus, true);
        document.addEventListener('keydown', onKeyDown);
    }

    function closeModal(){
        if(!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden','true');
        document.removeEventListener('focus', enforceFocus, true);
        document.removeEventListener('keydown', onKeyDown);
        try{ lastFocused && lastFocused.focus(); }catch(e){}
    }

    function enforceFocus(e){
        if(!modal.contains(e.target)){
            e.stopPropagation();
            closeBtn && closeBtn.focus();
        }
    }

    function onKeyDown(e){
        if(e.key === 'Escape'){
            // just close — do not persist dismissal
            closeModal();
        }
        // simple Tab handling: loop between close and ok
        if(e.key === 'Tab'){
            const focusables = [closeBtn, okBtn].filter(Boolean);
            if(focusables.length === 0) return;
            const idx = focusables.indexOf(document.activeElement);
            if(e.shiftKey){
                if(idx === 0){ focusables[focusables.length-1].focus(); e.preventDefault(); }
            } else {
                if(idx === focusables.length-1){ focusables[0].focus(); e.preventDefault(); }
            }
        }
    }

    // close on overlay click (no session persistence)
    overlay && overlay.addEventListener('click', ()=>{ closeModal(); });
    closeBtn && closeBtn.addEventListener('click', ()=>{ closeModal(); });
    okBtn && okBtn.addEventListener('click', ()=>{ closeModal(); });

    // open on every load (initial visit and reload)
    window.addEventListener('load', ()=>{
        // small timeout to give the page time to settle
        setTimeout(openModal, 250);
    });

})();
