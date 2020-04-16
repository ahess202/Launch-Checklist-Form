window.addEventListener('load', function() {
   let data;
   
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
      return response.json();
   }).then( function(json) {
      data = json;
      changeDisplay(0);
   });

   let launchForm = document.querySelector('form');
   let pilotName = document.getElementById('pilotName');
   let copilotName = document.getElementById('copilotName');
   let cargoMass = document.getElementById('cargoMass');
   let fuelLevel = document.getElementById('fuelLevel');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let faultyItems = document.getElementById('faultyItems');
   let launchStatus = document.getElementById('launchStatus');
   let warpSpeed = document.getElementById('warpSpeed');

   let formInputs = [
      pilotName,
      copilotName,
      cargoMass,
      fuelLevel
   ];

   let missionTarget = document.getElementById('missionTarget');

   function changeDisplay(index) {
      missionTarget.innerHTML = `
         <h2 id="destTitle">Mission Destination</h2>
            <ol id='destinationData'>
               <li class='typewriterli'>Name: ${data[index].name}</li>
               <li class='typewriterli'>Diameter: ${data[index].diameter}</li>
               <li class='typewriterli'>Star: ${data[index].star}</li>
               <li class='typewriterli'>Distance from Earth: ${data[index].distance}</li>
               <li class='typewriterli'>Number of Moons: ${data[index].moons}</li>
            </ol>
         <img id="planetPic" src="${data[index].image}"></img>
      `;
      let destinationData = document.getElementById('destinationData');
      let planetPic = document.getElementById('planetPic');
      
   };

   let planetSelector = document.getElementById('planets');

   planetSelector.addEventListener('change', function() {
      let index = document.getElementById('planets').value;
      changeDisplay(index);
   });

   launchForm.addEventListener('submit', function(e) {
      let inputsFilled = true;
      for (let i=0; i<formInputs.length; i++) {
         if (formInputs[i].value === '') {
            inputsFilled = false;
         };
      };

      if (!inputsFilled) {
         alert('Must complete all fields!')
         e.preventDefault();
      } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value)) {
         alert('Please Enter Valid Inputs for Pilot and Co-pilot!');
         e.preventDefault();
      } else if(isNaN(cargoMass.value)|| isNaN(fuelLevel.value)) {
         alert('Please Enter Valid Inputs for Cargo Mass and Fuel Level!');
         e.preventDefault();
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch!`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch!`;

         if ((cargoMass.value > 10000) && (fuelLevel.value < 10000)) {
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerHTML = 'Cargo Mass too high to initiate launch!';
            fuelStatus.innerHTML = 'Fuel level too low to initiate launch!';
            cargoStatus.style.color = 'red';
            fuelStatus.style.color = 'red';
            launchStatus.innerHTML = 'Shuttle Not Ready';
            launchStatus.style.color = 'red';
            warpSpeed.style.visibility = 'hidden';
            e.preventDefault();
         } else if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = 'Fuel level too low to initiate launch!';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch!';
            fuelStatus.style.color = 'red';
            cargoStatus.style.color = 'white';
            launchStatus.innerHTML = 'Shuttle Not Ready';
            launchStatus.style.color = 'red';
            warpSpeed.style.visibility = 'hidden';
            e.preventDefault();
         } else if (cargoMass.value > 10000) {
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerHTML = 'Cargo Mass too high to initiate launch!';
            fuelStatus.innerHTML = 'Fuel level high enough for launch!';
            cargoStatus.style.color = 'red';
            fuelStatus.style.color = 'white';
            launchStatus.innerHTML = 'Shuttle Not Ready';
            launchStatus.style.color = 'red';
            warpSpeed.style.visibility = 'hidden';
            e.preventDefault();
         } else {
            faultyItems.style.visibility = 'visible';
            cargoStatus.style.color = 'white';
            fuelStatus.style.color = 'white';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch!';
            fuelStatus.innerHTML = 'Fuel level high enough for launch!';
            launchStatus.innerHTML = 'Shuttle Ready For Launch';
            launchStatus.style.color = 'green';
            warpSpeed.style.visibility = 'visible';
            e.preventDefault();
         };
      };
   });
});
