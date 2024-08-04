import React, { useEffect, useState } from 'react';
import './Medals.css';

const Medals = () => {
  const [formattedMedals, setFormattedMedals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedals = async () => {
    const url = 'https://olympic-sports-api.p.rapidapi.com/medals/countries?year=2024';
    const apiKey = '690edd18a2msh9928e75189cdf2cp1cbd8ejsnd3d03c10c911';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'olympic-sports-api.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      const formattedData = data.medals.map((country) => ({
        team: country.name,
        flag: country.flag,
        goldMedals: country.medalStandings.goldMedalCount,
        silverMedals: country.medalStandings.silverMedalCount,
        bronzeMedals: country.medalStandings.bronzeMedalCount,
        totalMedals: country.medalStandings.totalMedals
      }));

      const sortedData = formattedData.sort((a, b) => {
        if (b.goldMedals !== a.goldMedals) return b.goldMedals - a.goldMedals;
        if (b.silverMedals !== a.silverMedals) return b.silverMedals - a.silverMedals;
        return b.bronzeMedals - a.bronzeMedals;
      });

      setFormattedMedals(sortedData); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedals(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='medals-container'>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Bronze</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {formattedMedals.map((medal, index) => (
          <tr key={index}>
            <td>
              <div className="flex-cell">
                <img src={medal.flag} alt={`${medal.team} flag`} />
                {medal.team}
              </div>
            </td>
            <td><span className="medal-circle gold">{medal.goldMedals}</span></td>
            <td><span className="medal-circle silver">{medal.silverMedals}</span></td>
            <td><span className="medal-circle bronze">{medal.bronzeMedals}</span></td>
            <td><b>{medal.totalMedals}</b></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default Medals;
