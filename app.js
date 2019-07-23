const smartWomenList = document.querySelector('#smart-women-list');

//create element and render Cafe
function renderWomen(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let weight = document.createElement('span');
  let activityPerWeek = document.createElement('span');


  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().firstName;
  weight.textContent = doc.data().weight;
  activityPerWeek.textContent = doc.data().activityPerWeek

  li.appendChild(name);
  li.appendChild(weight);
  li.appendChild(activityPerWeek);

  smartWomenList.appendChild(li);

}

db.collection('enrollmentForm').get().then((snapshot) => {
  snapshot.docs.forEach(doc =>{
    renderWomen(doc);
  })
})
