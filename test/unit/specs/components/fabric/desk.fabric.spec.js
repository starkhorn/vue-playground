import fabric from 'fabric'
import DeskShape from 'components/fabric/desk.fabric'

const PRECISION_TOLERANCE = 0.1

/* eslint-disable no-new */
describe('A fabric desk', function () {
  describe('getAbsolutePosition()', function () {
    it('returns its own position when not in a group', function () {
      const desk = new DeskShape({
        left: 5,
        top: 5
      })

      const absPosition = desk.getAbsolutePosition()

      expect(absPosition.left).to.be.closeTo(5, PRECISION_TOLERANCE)
      expect(absPosition.top).to.be.closeTo(5, PRECISION_TOLERANCE)
    })

    it('returns its position relative to its canvas when in a group', function () {
      const desk = new DeskShape({
        left: 10,
        top: 20
      })

      const anotherDesk = new DeskShape({
        left: 5,
        top: 30
      })

      new fabric.Group([ desk, anotherDesk ])

      const deskAbsPosition = desk.getAbsolutePosition()
      expect(deskAbsPosition.left).to.be.closeTo(10, PRECISION_TOLERANCE)
      expect(deskAbsPosition.top).to.be.closeTo(20, PRECISION_TOLERANCE)

      const anotherDeskAbsPosition = anotherDesk.getAbsolutePosition()
      expect(anotherDeskAbsPosition.left).to.be.closeTo(5, PRECISION_TOLERANCE)
      expect(anotherDeskAbsPosition.top).to.be.closeTo(30, PRECISION_TOLERANCE)
    })
  })

  describe('setAbsolutePosition()', function () {
    it('sets left and top to the input position when not in a group', function () {
      const desk = new DeskShape()

      desk.setAbsolutePosition({
        left: 5,
        top: 10
      })

      expect(desk.left).to.be.closeTo(5, PRECISION_TOLERANCE)
      expect(desk.top).to.be.closeTo(10, PRECISION_TOLERANCE)
    })

    it('converts left and top to the group coordinate when in a group', function () {
      const desk = new DeskShape()

      new fabric.Group([ desk ], {
        width: 100,
        height: 100,
        left: 100,
        top: 100
      })

      // should position at the center of the group
      desk.setAbsolutePosition({
        left: 150,
        top: 150
      })

      expect(desk.left).to.be.closeTo(0, PRECISION_TOLERANCE)
      expect(desk.top).to.be.closeTo(0, PRECISION_TOLERANCE)
    })
  })

  describe('when selected', function () {
    it('sets the application current desk to itself')
  })
})