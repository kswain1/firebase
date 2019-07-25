const smartWomenList = document.querySelector('#smart-women-list');
const form = document.querySelector('#add-women-enrollment-form');

//create element and dashboard list
function renderWomen(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let weight = document.createElement('span');
  let height = document.createElement('span');
  let exit = document.createElement('div');

  li.setAttribute('data', doc.id);
  name.textContent = doc.data().firstName;
  weight.textContent = doc.data().weight;
  height.textContent = doc.data().height;
  exit.textContent = "x";


  li.appendChild(name);
  li.appendChild(weight);
  li.appendChild(height);
  li.appendChild(exit);

  smartWomenList.appendChild(li);

  //removes data event
  exit.addEventListener('click', (exitClicked) => {
    exitClicked.stopPropagation();
    // console.log(target.exitClicked.parentElement);
    let id = exitClicked.target.parentElement.getAttribute('data');

    db.collection('enrollmentForm').doc(id).delete();
  });

}

//saving data to enrollmentForm
form.addEventListener('submit', (womenSubmit) => {
  womenSubmit.preventDefault();
  db.collection('enrollmentForm').add({
    name: form.firstName.value,
    height: form.height.value,
    weight: form.weight.value
  });
  form.name.value = "";
  form.height.value = "";
  form.weight.value = "";
})

db.collection('enrollmentForm').orderBy('weight').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data());
    if (change.type == "added"){
      renderWomen(change.doc);
    } else if (change.type == "removed") {
      let li = smartWomenList.querySelector('[data=' + change.doc.id + ']');
      smartWomenList.removeChild(li);
    }

  });
})
