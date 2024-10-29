<template>
  <div class="convert-currency">
    <div>
      <!-- card - initial dollar amount -->
      <div class="convert-currency__card">
        <div>Dólares</div>
        <div>
          <span>Envías</span>
          <div>
            <label for="">$</label>
            <input
              type="number"
              placeholder="Envías"
            />
          </div>
        </div>
      </div>

      <div>
        <span class="icon">Cambiar tipo de moneda</span>
      </div>

      <!-- card - initial amount in soles -->
      <div class="convert-currency__card">
        <div>Soles</div>
        <div>
          <span>Recibes</span>
          <div>
            <label for="">S/</label>
            <input
              type="number"
              placeholder="Recibes"
            />
          </div>
        </div>
      </div>
    </div>

    <button class="">Iniciar operación</button>
  </div>
</template>
