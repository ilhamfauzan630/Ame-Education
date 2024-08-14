import React, { useState } from 'react';

const Box = () => {
  const [selectedMeetings, setSelectedMeetings] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleMeetingChange = (event) => {
    const meetings = parseInt(event.target.value);
    setSelectedMeetings(meetings);
    // Reset selected subjects if the number of allowed subjects is decreased
    if (selectedSubjects.length > meetings) {
      setSelectedSubjects(selectedSubjects.slice(0, meetings));
    }
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else if (selectedSubjects.length < selectedMeetings) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  return (
    <div>
      <h3>Pilih Pertemuan:</h3>
      <div>
        <input
          type="radio"
          id="1x"
          name="meetings"
          value="1"
          onChange={handleMeetingChange}
        />
        <label htmlFor="1x">1 x Pertemuan - Rp. 110.000 /bln</label>
      </div>
      <div>
        <input
          type="radio"
          id="2x"
          name="meetings"
          value="2"
          onChange={handleMeetingChange}
        />
        <label htmlFor="2x">2 x Pertemuan - Rp. 220.000 /bln</label>
      </div>
      <div>
        <input
          type="radio"
          id="3x"
          name="meetings"
          value="3"
          onChange={handleMeetingChange}
        />
        <label htmlFor="3x">3 x Pertemuan - Rp. 330.000 /bln</label>
      </div>
      <div>
        <input
          type="radio"
          id="4x"
          name="meetings"
          value="4"
          onChange={handleMeetingChange}
        />
        <label htmlFor="4x">4 x Pertemuan - Rp. 480.000 /bln</label>
      </div>
      <div>
        <input
          type="radio"
          id="5x"
          name="meetings"
          value="5"
          onChange={handleMeetingChange}
        />
        <label htmlFor="5x">5 x Pertemuan - Rp. 600.000 /bln</label>
      </div>

      <h3>Pilih Pelajaran:</h3>
      {['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Inggris'].map((subject) => (
        <div key={subject}>
          <input
            type="checkbox"
            id={subject}
            value={subject}
            checked={selectedSubjects.includes(subject)}
            onChange={handleSubjectChange}
            disabled={selectedSubjects.length >= selectedMeetings && !selectedSubjects.includes(subject)}
          />
          <label htmlFor={subject}>{subject}</label>
        </div>
      ))}

      <div>
        <h4>Pertemuan yang dipilih: {selectedMeetings} x pertemuan</h4>
        <h4>Pelajaran yang dipilih: {selectedSubjects.join(', ')}</h4>
      </div>
    </div>
  );
};

export default Box;