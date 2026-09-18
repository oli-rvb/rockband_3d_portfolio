import { Link } from 'react-router-dom'

// Named and exported inline (rather than `const CTA = () => {}` + `export default CTA`):
// eslint-plugin-react-refresh can't verify an all-uppercase name like "CTA" refers to a
// component when it's exported by reference, and flags it as a non-component export.
export default function CTA() {
  return (
    <section className='cta'>
        <p className='cta-text'>
            Have a project in mind ? <br className='sm:block hidden'/>Let's build somthing together!
        </p>
        <Link to="/contact" className='btn'>
            Contact
        </Link>
    </section>
  )
}