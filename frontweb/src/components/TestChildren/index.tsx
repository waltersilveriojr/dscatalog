import React from 'react';

type Props = {
  price: number;
  children: React.ReactNode;
};

const TestChildren = ({ price, children }: Props) => {
  return (
    <>
      <h1>Teste</h1>
      {children}
    </>
  );
};

export default TestChildren;
