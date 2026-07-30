import React from 'react';
import { motion } from 'framer-motion';

const worldwideLocations = [
  'Ethiopia', 'Sudan', 'Madagascar', 'Tanzania', 'India', 'Senegal', 'Kenya', 'Zambia', 'Myanmar', 'Dubai',
  'Sri Lanka', 'Mexico', 'Guinea Bissau', 'Mali', 'China', 'United States', 'Indonesia', 'Nigeria', 'Brazil',
  'Bangladesh', 'Russia', 'Europe', 'Philippines', 'Japan', 'Egypt', 'DR Congo', 'Vietnam', 'Iran', 'Turkey',
  'Germany', 'Thailand', 'United Kingdom', 'France', 'South Africa', 'Italy', 'Colombia', 'South Korea',
  'Uganda', 'Spain', 'Argentina', 'Algeria', 'Iraq', 'Poland', 'Canada', 'Morocco', 'Saudi Arabia', 'Ukraine',
  'Angola', 'Yemen', 'Peru', 'Malaysia', 'Ghana', 'Mozambique', 'Nepal', 'Côte d\'Ivoire', 'Venezuela',
  'Cameroon', 'Niger', 'Australia', 'North Korea', 'Burkina Faso', 'Syria', 'Malawi', 'Romania', 'Chile',
  'Chad', 'Ecuador', 'Somalia', 'Guatemala', 'Netherlands', 'Cambodia', 'Zimbabwe', 'Rwanda', 'Benin',
  'Burundi', 'Tunisia', 'Bolivia', 'Haiti', 'Belgium', 'Jordan', 'Dominican Republic', 'Cuba', 'South Sudan',
  'Sweden', 'Honduras', 'Czech Republic (Czechia)', 'Azerbaijan', 'Greece', 'Papua New Guinea', 'Portugal',
  'Hungary', 'United Arab Emirates', 'Belarus', 'Israel', 'Austria', 'Switzerland', 'Sierra Leone', 'Laos',
  'Serbia', 'Nicaragua', 'Libya', 'Paraguay', 'Bulgaria', 'El Salvador', 'Congo', 'Singapore', 'Denmark',
  'Slovakia', 'Central African Republic', 'Finland', 'Norway', 'Liberia', 'State of Palestine', 'Lebanon',
  'New Zealand', 'Costa Rica', 'Ireland', 'Mauritania', 'Oman', 'Panama', 'Kuwait', 'Croatia', 'Eritrea',
  'Georgia', 'Mongolia', 'Moldova', 'Uruguay', 'Bosnia and Herzegovina', 'Albania', 'Jamaica', 'Armenia',
  'Gambia', 'Lithuania', 'Qatar', 'Botswana', 'Namibia', 'Gabon', 'Lesotho', 'Slovenia', 'North Macedonia',
  'Latvia', 'Equatorial Guinea', 'Trinidad and Tobago', 'Bahrain', 'Timor-Leste', 'Estonia', 'Mauritius',
  'Cyprus', 'Eswatini', 'Djibouti', 'Fiji', 'Comoros', 'Guyana', 'Bhutan', 'Solomon Islands', 'Luxembourg',
  'Montenegro', 'Suriname', 'Cabo Verde', 'Micronesia', 'Malta', 'Maldives', 'Brunei', 'Bahamas', 'Belize',
  'Iceland', 'Vanuatu', 'Barbados', 'Sao Tome & Principe', 'Samoa', 'Saint Lucia', 'Kiribati', 'Grenada',
  'Tonga', 'Seychelles', 'St. Vincent & Grenadines', 'Antigua and Barbuda', 'Andorra', 'Dominica',
  'Saint Kitts & Nevis', 'Marshall Islands', 'Liechtenstein', 'Monaco', 'San Marino', 'Palau', 'Nauru',
  'Tuvalu', 'Holy See'
];

const indianStates = [
  'Rajasthan', 'Gujarat', 'Delhi', 'Madhya Pradesh', 'Karnataka', 'Haryana', 'Punjab', 'Odisha',
  'Chatisgarh', 'Kerala', 'Bihar', 'Uttar Pradesh', 'Jharkhand', 'Andhra Pradesh', 'Telangana',
  'Tamil Nadu', 'Arunachal Pradesh', 'Assam', 'Goa', 'Himachal Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura', 'Uttarakhand', 'West Bengal'
];

export default function GlobalPresence() {
  return (
    <section className="bg-white py-3 lg:py-5 border-t border-gray-100 overflow-hidden font-sans">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 text-center">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-2.5"
        >
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-[#555555] tracking-tight">
            Food Processing and Packaging Machineries Manufacturers <span className="text-[#F97316] font-medium">In Worldwide</span>
          </h2>
        </motion.div>

        {/* Worldwide Locations Simple Pipe Separated List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-3.5 text-xs sm:text-sm md:text-base font-medium text-[#333333] leading-normal text-center"
        >
          {worldwideLocations.map((country, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-blue-600 transition-colors cursor-default inline-block">{country}</span>
              {idx < worldwideLocations.length - 1 && (
                <span className="text-gray-300 mx-1.5 font-normal">|</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Divider: In India */}
        <div className="relative my-2.5 max-w-sm mx-auto flex items-center justify-center">
          <div className="w-full border-t border-gray-200" />
          <span className="bg-white px-4 text-xs sm:text-sm font-semibold text-[#F97316] shrink-0">
            In India
          </span>
          <div className="w-full border-t border-gray-200" />
        </div>

        {/* Indian States Simple Pipe Separated List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-xs sm:text-sm md:text-base font-medium text-[#333333] leading-normal text-center"
        >
          {indianStates.map((state, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-blue-600 transition-colors cursor-default inline-block">{state}</span>
              {idx < indianStates.length - 1 && (
                <span className="text-gray-300 mx-1.5 font-normal">|</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
