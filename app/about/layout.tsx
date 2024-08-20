import React from 'react'

function TestLayout(
    { children }: {
        children: React.ReactNode
    }
) {
    return (
        <div className='flex justify-center' suppressHydrationWarning={true} suppressContentEditableWarning={true}>
            {children}
        </div>
    )
}

export default TestLayout