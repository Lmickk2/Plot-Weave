import { useState } from 'react';
import PostList from '../Components/PostList';
import AllWeaves from '../Components/AllWeaves';

function Community() {
  const [activeTab, setActiveTab] = useState('Posts');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="filter-type">
        <button onClick={() => handleTabClick('Posts')} className={activeTab === 'Posts' ? 'active' : ''}>Posts</button>
        <button onClick={() => handleTabClick('Weaves')} className={activeTab === 'Weaves' ? 'active' : ''}>Weaves</button>
      </div>
      <div>
        {activeTab === 'Posts' ? <PostList /> : <AllWeaves />}
      </div>
    </div>
  );
}

export default Community;
