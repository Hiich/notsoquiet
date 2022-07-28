import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'

type Props = {
  maxWidth?: string
  className?: string
  children?: ReactNode
}

export const Container: FC<Props> = (
  { maxWidth, children, className } = { maxWidth: 'max-w-2xl' }
) => (
  <div
    className={clsx(
      'container mx-auto max-w-[1300px] px-6 md:px-2',
      maxWidth,
      className
    )}
  >
    {children}
  </div>
)

export default Container
