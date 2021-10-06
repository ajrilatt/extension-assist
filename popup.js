  function getPerms() {

    navigator.mediaDevices.getUserMedia({ audio:"true" })
      .then(function(stream) {
        chrome.runtime.sendMessage({ msg:"begin" });
      })
      .catch(function(err) {
        // do nothing, I guess... jerk.
      });
  };

document.getElementById('getperms').addEventListener('click', getPerms);
