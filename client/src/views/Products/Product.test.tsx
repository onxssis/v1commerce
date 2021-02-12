import React from 'react';
import { render, screen } from '@testing-library/react';

import Product from './Product';
import { MockedProvider } from '@apollo/client/testing';

const product = {
    id: '1',
    brand: 'Samsung',
    name: 'Samsung Galaxy J6',
    slug: 'samsung-galaxy-j6',
    price: 100,
    summary: 'Samsung Galaxy J6 Summary',
    createdAt: Date.now(),
    updatedAt: Date.now()
}

it('should render product successfully', async () => {

    render(
        <MockedProvider>
            <Product {...product} />
        </MockedProvider>
    );

    const img = await screen.findByRole('img');
    const name = await screen.findByText('Samsung Galaxy J6');
    const price = await screen.findByText('$100');
    const summary = await screen.findByText('Samsung Galaxy J6 Summary');

    expect(img).not.toBeNull();
    expect(name).not.toBeNull()
    expect(price).not.toBeNull();
    expect(summary).not.toBeNull();
});