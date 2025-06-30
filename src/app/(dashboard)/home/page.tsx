import Card from '@/components/organisms/Card';
import React, { FC } from 'react'

interface HomeDashboardProps {
  
}

const HomeDashboard: FC<HomeDashboardProps> = ({  }) => {
  return (
    <div>
       <div className="grid grid-cols-2 gap-5">
       <Card title='Total Active Users' number="20"/>
       <Card title='Total Users Apply' number="20"/>
       </div>
    </div>
  )
}

export default HomeDashboard;