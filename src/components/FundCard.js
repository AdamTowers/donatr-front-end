import React from 'react';

const FundCard = (props) => {
  return (
    <div className='fund-card'>
      <h4>{props.fund.title}</h4>
      <h5>{props.fund.organization.name}</h5>
      <h4><strong>{props.fund.donor_count} donors</strong></h4>
      <p>${props.fund.raised}/<strong>${props.fund.goal}</strong> goal reached</p>
    </div>
  )
}

export default FundCard;
