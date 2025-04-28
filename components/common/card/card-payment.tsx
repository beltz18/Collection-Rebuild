import { CardLoan } from './card.types'
import { cn } from '@uti/cn'
import { Grid } from '@com/grid'
import {
  Card as Content, 
  CardHeader as Header, 
  CardBody as Body, 
  CardFooter as Footer
} from '@heroui/card'

export function Card({ children, className }: CardLoan) {
  return (
    <Content className={ className }>
      { children }
    </Content>
  )
}

function CardHeader({ children, className }: CardLoan) {
  return (
    <Header className={ cn('flex justify-between items-center', className) }>
      { children }
    </Header>
  )
}

function CardBody({ children, className }: CardLoan) {
  return (
    <>
      <Body className={cn('', className)}>
        <Grid>
          {children}
        </Grid>
      </Body>
    </>
  )
}

function CardFooter({ children, className }: CardLoan) {
  return(
    <Footer className={ cn('', className) }>
      { children }
    </Footer>
  )
}

Card.Header = CardHeader
Card.Body   = CardBody
Card.Footer = CardFooter