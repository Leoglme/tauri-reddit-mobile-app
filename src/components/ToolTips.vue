<template>
    <div class="row">
      <div class="tooltip">Right
        <div class="tooltip__content tooltip__content_right">Tooltip text</div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .row {
    gap:     var(--space-600);
    display: flex;
    justify: {
      content: center;
    };
    align: {
      items: center;
    };
  }

  .tooltip {
    --tooltip__content_bd-cr: var(--black-1a);

    cursor:  help;
    color:   var(--tooltip_cr, var(--blue-1));
    display: grid;
    place: {
      items: center;
    };
    line: {
      height: var(--space-350);
    };
    border: {
      bottom: 1px dotted;
    };

    position: relative;
    &__content {
      color:      var(--tooltip__content-cr, var(--white-2));
      z-index:    var(--zx-400);
      width:      max-content;
      visibility: hidden;
      opacity: 0;
      position:   absolute;
      padding:    0.3em 0.8em;
      font: {
        size: var(--tooltip__content_ft-se, var(--ft-se-300));
      };
      border: {
        radius: 7px;
      };
      background: {
        color: var(--tooltip__content_bd-cr, var(--black-2));
      };

      &_top {
        transform: translateY(-100%);

        &::before {
          left:      50%;
          transform: translateX(-50%) rotate(45deg);
          bottom:    calc(var(--wh) / 2 * -1);
        }
      }

      &_right {
        transform: translateX(85%);

        &::before {
          top:       50%;
          transform: translateY(-50%) rotate(45deg);
          left:      calc(var(--wh) / 2 * -1);
        }
      }

      &_left {
        transform: translateX(-85%);

        &::before {
          top:       50%;
          transform: translateY(-50%) rotate(45deg);
          right:     calc(var(--wh) / 2 * -1);
        }
      }

      &_bottom {
        transform: translateY(120%);

        &::before {
          left:      50%;
          transform: translateX(-50%) rotate(45deg);
          top:       calc(var(--wh) / 2 * -1);
        }
      }

      &::before {
        --wh: 10px;

        width:    var(--wh, 10px);
        position: absolute;
        content:  '';
        aspect: {
          ratio: 1;
        };
        background: {
          color: var(--tooltip__content_bd-cr, var(--black-2));
        };
      }
    };

    &:hover {
      border: {
        bottom: {
          color: var(--black-1);
        };
      };

      .tooltip__content {
        transition: opacity 250ms ease-in;
        opacity:    1;
        visibility: visible;
      }
    }
  }

  @media (max-width: 950px) {
    .row {
      flex: {
        direction: column;
      };
    }
  }
</style>