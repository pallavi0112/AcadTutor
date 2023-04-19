import React from 'react'

const AddUnit = () => {
  return (
       <>
         <div className='add-unit'>
            <form>
                <div>
                <label>unit-I</label>
                <input type='text'></input>
                </div>
                <div>
                <label>unit-II</label>
                <input type='text'></input>
                </div>
                <div>
                <label>unit-III</label>
                <input type='text'></input>
                </div>
                <div>
                <label>unit-IV</label>
                <input type='text'></input>
                </div>
                <div>
                <label>unit-V</label>
                <input type='text'></input>
                </div>
                <button type='submit'>save</button>
            </form>
         </div>
       </>
  )
}

export default AddUnit