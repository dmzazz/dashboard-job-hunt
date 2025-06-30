import React, { FC } from 'react'

interface CompanyProfileProps {
  
}

const CompanyProfile: FC<CompanyProfileProps> = async ({  }) => {
  const data = await fetch("http://localhost:3000/api/company/profile")
  const response = await data.json()
  console.log(response)
  return (
    <div>
     {response.map((item: any) => (
        <div key={item.id}>
            {item.name}
        </div>
     ))}
    </div>
  )
}

export default CompanyProfile;