document.addEventListener('DOMContentLoaded', function () {
    const schemaOptions = [
      { label: 'First Name', value: 'first_name' },
      { label: 'Last Name', value: 'last_name' },
      { label: 'Gender', value: 'gender' },
      { label: 'Age', value: 'age' },
      { label: 'Account Name', value: 'account_name' },
      { label: 'City', value: 'city' },
      { label: 'State', value: 'state' }
    ];
  
    const saveSegmentBtn = document.getElementById('saveSegmentBtn');
    const popup = document.getElementById('popup');
    const schemaContainer = document.getElementById('schemaContainer');
    const schemaDropdown = document.getElementById('schemaDropdown');
    const addSchemaLink = document.getElementById('addSchemaLink');
    const submitSegmentBtn = document.getElementById('Submit_segment');
    const cancelBtn = document.getElementById('cancel');
    const segmentNameInput = document.getElementById('segmentName');
  
    saveSegmentBtn.addEventListener('click', function () {
      popup.style.display = 'block';
    });
  
    cancelBtn.addEventListener('click', function () {
      popup.style.display = 'none';
    });
  
    addSchemaLink.addEventListener('click', function (e) {
      e.preventDefault();
      const selectedValue = schemaDropdown.value;
      if (selectedValue) {
        const selectedOption = schemaOptions.find(option => option.value === selectedValue);
  
        const schemaElement = document.createElement('div');
        schemaElement.textContent = selectedOption.label;
        schemaContainer.appendChild(schemaElement);
  
        const optionToDisable = Array.from(schemaDropdown.options).find(option => option.value === selectedValue);
        optionToDisable.disabled = true;

        schemaDropdown.value = '';
      }
    });
  
    submitSegmentBtn.addEventListener('click', function () {
      const segmentName = segmentNameInput.value;
      const schemaElements = schemaContainer.children;
      const schemaArray = Array.from(schemaElements).map(element => {
        const value = schemaOptions.find(option => option.label === element.textContent).value;
        return { [value]: element.textContent };
      });
  
      const segmentData = {
        segment_name: segmentName,
        schema: schemaArray
      };
  
      fetch('http://localhost:3000/b425817d-ad65-44dc-aa12-0a1fd1883a5e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(segmentData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data sent successfully:', data);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
  
      popup.style.display = 'none';
    });
  });
  